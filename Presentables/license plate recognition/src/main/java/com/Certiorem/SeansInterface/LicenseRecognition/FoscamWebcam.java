package com.Certiorem.SeansInterface.LicenseRecognition;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;

public class FoscamWebcam implements MyWebcam {
    @Override
    public boolean snapPicture(int snapshotCounter) {
        try {
            URL url = new URL("http://192.168.0.140:88/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=root&pwd=Password1234");
            String filePath = FilePath.snapshotPath + snapshotCounter + ".jpg";
            BufferedImage image = ImageIO.read(url);
            ImageIO.write(image, "jpg", new File(filePath));
            System.err.println("IP foscam snapshot " + snapshotCounter + " taken");
            return true;
        }
        catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
